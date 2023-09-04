from datasources.postgres.postgres import PostgresDatasource
from datasources.mysql.mysql import MySQLDatasource

DATASOURCES = [
    PostgresDatasource(),
    MySQLDatasource(),
]

def get_all_datasources():
    """Return a list of all datasources."""
    result = []

    for datasource in DATASOURCES:
        result.append(
            {
                "is_system": True,
                "is_active": datasource.is_active,
                "name": datasource.name,
                "description": datasource.description,
                "category": datasource.category,
                "source_type": datasource.type,
                "fields": [
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                    }
                    for env_key in datasource.get_env_keys()
                ],
            }
        )

    return result
