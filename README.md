# Тестовое задание для Effective Mobile

## Как локально запустить проект?

#### 1) Склонировать репозиторий

```
git clone https://github.com/lostChamp/Test-Case-EffectiveMobile.git
```

#### 2) Открыть проект и установить пакеты

```
npm install
```

#### 3) Установить nx(система сборки)

```
npm install -g nx
```

Возможно потребуется включить выполнение сценариев (Это абсолютно безопасная настройка)

1) Нужно зайти в PowerShell от имени Администратора
2) Выполнить команду Set-ExecutionPolicy RemoteSigned
3) Выбрать пункт A

#### 4) Запустить докер и выполнить команду

```
docker-compose up -d
```

#### 5.1) Можно запустить все микросервисы одной командой

```
nx run-many --target=serve --all --parallel=3
```

#### 5.2) Можно запускать микросервисы по отдельности

```
nx run api:serve
nx run user:serve
nx run logs:serve
```

#### Swagger документация по адресу

```
http://localhost:8080/api
```

# Test case for Effective Mobile

## How to launch a project locally?

#### 1) Clone a repository

```
git clone https://github.com/lostChamp/Test-Case-EffectiveMobile.git
```

#### 2) Open the project and install the packages

```
npm install
```

#### 3) Install nx(build system)

```
npm install -g nx
```

You may need to enable script execution (This is an absolutely safe setting)

1) You need to log into PowerShell as an Administrator
2) Execute the Set-ExecutionPolicy RemoteSigned command
3) Select the A item

#### 4) Launch docker and execute the command

```
docker-compose up -d
```

#### 5.1) You can run all microservices with one command

```
nx run-many --target=serve --all --parallel=3
```

#### 5.2) You can run microservices separately

```
nx run api:serve
nx run user:serve
nx run logs:serve
```

#### Swagger documentation at

```
http://localhost:8080/api
```
