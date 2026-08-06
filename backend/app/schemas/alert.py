from pydantic import BaseModel

class AlertResponse(BaseModel):
    id: int
    threat: str
    severity: str
    source: str
    status: str

    class Config:
        from_attributes = True