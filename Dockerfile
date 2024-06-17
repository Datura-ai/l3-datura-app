FROM python:3.11

LABEL maintainer="Ismael Sh me@theiskaa.com"

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="/root/.local/bin:$PATH"

WORKDIR /app/server

COPY apps/server/pyproject.toml apps/server/poetry.lock ./

COPY apps/server /app/server

RUN poetry config virtualenvs.create false \
    && poetry install --no-dev

ENV PYTHONPATH="${PYTHONPATH}:/app/server"

EXPOSE 80

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
