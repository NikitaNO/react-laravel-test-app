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

$app->post('register', 'UserController@register');

$app->post('login', 'UserController@login');

$app->group(['middleware' => 'auth'], function () use ($app) {

    $app->get('me', function ()    {
        return \Illuminate\Support\Facades\Auth::user();
    });

    $app->post('edit', 'UserController@updateUserData');

});
