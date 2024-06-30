create table users
(
    id    varchar(64)
            constraint users_pk
            primary key,
    email varchar(256) not null,
    name  varchar(32)
);

create table list
(
    id          serial
                  constraint list_pk
                  primary key,
    owned_by    varchar(64) not null
                  references users (id),
    description text
);

create index on list(owned_by);
