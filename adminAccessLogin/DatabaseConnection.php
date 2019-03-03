<?php
declare(strict_types=1);

namespace adminAccessLogin;

include 'dbConf.php';

class DatabaseConnection
{
    private $connection;

    public function __construct()
    {
        $this->connection = new \PDO('mysql:host=' . DB_HOST . ';dbname=files', DB_NAME, DB_PASS);
    }

    public function query($query)
    {
        return $this->connection->query($query);
    }
}