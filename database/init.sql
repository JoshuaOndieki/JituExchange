IF NOT EXISTS
(SELECT name FROM master.sys.databases WHERE name = 'JituExchange')
CREATE DATABASE JituExchange;
