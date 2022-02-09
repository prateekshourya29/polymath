from graphene import ObjectType, Schema
from myapp.schema import Query as myapp_query, Mutation as myapp_mutation

class Query(myapp_query, ObjectType):
  pass


class Mutation(myapp_mutation, ObjectType):
  pass


schema = Schema(query=Query, mutation=Mutation)