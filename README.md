Clone o repositório.

Crie um ambiente virtual no python: python -m venv env

Ative o ambiente virtual: env\Scripts\activate

Instale os requerimentos: pip install -r requirements.txt

Entre no diretório agendamento para migrar o banco de dados:
cd agendamento
python manage.py makemigrations
python manage.py migrate
