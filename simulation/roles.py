class Role:
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description
        }

roles = [
    Role("Central Bank", "Monetary Policy"),
    Role("Firm", "Production of goods and services"),
    Role("Household", "Work, Consumes and Saves"),
    Role("Government","Fiscal Policy")
]