from typing import List
from datasources.base import BaseDatasource, DatasourceEnvKey, DatasourceEnvKeyType, DatasourceCategory, DatasourceType
from tools.base import BaseTool
from tools.datasources.mysql.mysql import MySQLDatabaseTool


class MySQLDatasource(BaseDatasource):
    name: str = "MySQL"
    description: str = "MySQL datasource"
    category: DatasourceCategory = DatasourceCategory.DATABASE
    type: DatasourceType = DatasourceType.MySQL

    def get_tools(self) -> List[BaseTool]:
        return [MySQLDatabaseTool()]
    
    def get_env_keys(self) -> List[DatasourceEnvKey]:
        return [
            DatasourceEnvKey(label="Database Name", key="NAME", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Host", key="HOST", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Port", key="PORT", key_type=DatasourceEnvKeyType.INT, is_required=True, is_secret=True),
            DatasourceEnvKey(label="User", key="USER", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Password", key="PASS", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
        ]
