"""
Авторизация игроков казино: регистрация, вход, получение профиля
"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')

    # Регистрация
    if action == 'register' and method == 'POST':
        username = body.get('username', '').strip()
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        if not username or not email or not password:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Заполните все поля'})}
        if len(password) < 6:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Пароль минимум 6 символов'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute('SELECT id FROM casino_users WHERE email = %s OR username = %s', (email, username))
        if cur.fetchone():
            conn.close()
            return {'statusCode': 409, 'headers': CORS, 'body': json.dumps({'error': 'Пользователь уже существует'})}

        token = secrets.token_hex(32)
        cur.execute(
            'INSERT INTO casino_users (username, email, password_hash, balance) VALUES (%s, %s, %s, 0) RETURNING id',
            (username, email, hash_password(password))
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'token': f'{user_id}:{token}',
            'user': {'id': user_id, 'username': username, 'email': email, 'balance': 0}
        })}

    # Вход
    if action == 'login' and method == 'POST':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            'SELECT id, username, email, balance FROM casino_users WHERE email = %s AND password_hash = %s',
            (email, hash_password(password))
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный email или пароль'})}

        user_id, username, user_email, balance = row
        token = secrets.token_hex(32)

        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'token': f'{user_id}:{token}',
            'user': {'id': user_id, 'username': username, 'email': user_email, 'balance': float(balance)}
        })}

    # Профиль
    if action == 'me' and method == 'POST':
        token = body.get('token', '')
        if not token or ':' not in token:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}

        user_id = token.split(':')[0]
        conn = get_conn()
        cur = conn.cursor()
        cur.execute('SELECT id, username, email, balance FROM casino_users WHERE id = %s', (user_id,))
        row = cur.fetchone()
        conn.close()

        if not row:
            return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Пользователь не найден'})}

        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'user': {'id': row[0], 'username': row[1], 'email': row[2], 'balance': float(row[3])}
        })}

    return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неизвестное действие'})}
