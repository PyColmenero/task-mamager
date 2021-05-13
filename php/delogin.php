<?php

session_start();

setcookie("data-login", "", time() - 3600, "/");

?>