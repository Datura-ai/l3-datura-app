from typing import List, Optional
from l3_types.agent_types import AgentWithConfigsResponse

class SystemMessageBuilder:
    def __init__(self, agent_with_configs: AgentWithConfigsResponse):
        self.agent = agent_with_configs.agent
        self.configs = agent_with_configs.configs

    def build(self) -> str:
        result = ""

        role = self.build_role(self.agent.role)
        description = self.build_description(self.agent.description)
        goals = self.build_goals(self.configs.goals)
        instructions = self.build_instructions(self.configs.instructions)
        constraints = self.build_constraints(self.configs.constraints)
        tools = self.build_tools(self.configs.tools)

        result = f"{role}\n{description}\n{goals}\n{instructions}\n{constraints}\n{tools}"
        return result


    def build_role(self, role: Optional[str]):
        if role is None or role == "":
            return ""
        
        return f"ROLE: {role}\n"
    
    def build_description(self, description: Optional[str]):
        if description is None or description == "":
            return ""
        
        return f"DESCRIPTION: {description}\n"

    def build_goals(self, goals: List[str]):
        if len(goals) == 0:
            return ""
        
        goals = "GOALS: \n" + "\n".join(f"- {goal}" for goal in goals) + "\n"
        return goals
    
    def build_instructions(self, instructions: List[str]):
        if len(instructions) == 0:
            return ""
        
        instructions = "INSTRUCTIONS: \n" + "\n".join(f"- {instruction}" for instruction in instructions) + "\n"
        return instructions
    
    def build_constraints(self, constraints: List[str]):
        if len(constraints) == 0:
            return ""
        
        constraints = "CONSTRAINTS: \n" + "\n".join(f"- {constraint}" for constraint in constraints) + "\n"
        return constraints
    
    def build_tools(self, tools: List[str]):
        # if len(tools) == 0:
        #     return ""
        
        # tools = "TOOLS: \n" + "\n".join(f"- {tool}" for tool in tools) + "\n"
        tools = (
            "{current_chat_data}\n"
            "TOOLS:"
            "------"
            "Assistant has access to the following tools:"
        )

        return tools
