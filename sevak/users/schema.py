
from graphene import Int, List, Mutation, ObjectType, String
from graphene_django import DjangoObjectType

from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(ObjectType):
    users = List(UserType)

    def resolve_users(self, info):
        return User.objects.all()


class CreateUser(Mutation):
    id = Int()
    first_name = String()
    last_name = String()

    class Arguments:
        first_name = String()
        last_name = String()

    def mutate(self, info, first_name, last_name):
        user = User(first_name=first_name, last_name=last_name)
        user.save()

        return CreateUser(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
        )


class Mutation(ObjectType):
    create_user = CreateUser.Field()
