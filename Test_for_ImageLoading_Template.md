***Composer is needed to work with Twig***  

[Composer installation](https://getcomposer.org/download/)  
``composer install``  
``composer require twig/twig``

Setup for Twig:
````php
<?php
// setup.php

require 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('templates/'); // <-- 'templates/' folder where all the templates are
$twig = new Twig_Environment($loader);

````

Rendering the Template and displaying the images:

````php
<?php
// index.php

require 'setup.php';

$file = 'index.html.twig';

$imageDirectory = 'images/'; // <-- 'The directory where all images are'

$images = \glob($imageDirectory . '/*.jpg'); // <-- get Path for images

$tpl = $twig->load($file);
echo $tpl->render([
    'images' => $images // <-- giving the template all images
]);

````

HTML:

````html
<!-- index.html.twig -->

<!DOCTYPE html>
<html lang='de'>
<head>
    <meta charset='UTF-8'>
    <title>Twig</title>
</head>
<body>

{% for image in images %}
    <img src='{{ image }}' alt=''> <!-- src attribute to the path from the image -->
{% endfor %}

</body>
</html>

````
