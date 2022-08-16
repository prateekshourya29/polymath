from graphene import ObjectType, Schema
from users.schema import Query as users_query, Mutation as users_mutation

class Query(users_query, ObjectType):
  pass


class Mutation(users_mutation, ObjectType):
  pass


schema = Schema(query=Query, mutation=Mutation)