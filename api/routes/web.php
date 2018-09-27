<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->get('/key', function() {
    return str_random(32);
});


$router->get('/','HomeController@index');

/* User */


$router->post('/user','UserController@register');

$router->group(['middleware' => 'auth'], function () use ($router) {
	$router->get('/user','UserController@info');
	$router->put('/user/update','UserController@update');
	$router->delete('/user/','UserController@delete');
});


//Example module
$router->get('/todo',['middleware' => 'auth','uses'=>'TodoController@todo']);
$router->post('/todo',['middleware' => 'auth','uses'=>'TodoController@addTodo']);
$router->put('/todo',['middleware' => 'auth','uses'=>'TodoController@updateTodo']);
$router->delete('/todo/{id}',['middleware' => 'auth','uses'=>'TodoController@deleteTodo']);
