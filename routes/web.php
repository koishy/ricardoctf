<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return redirect('home');
});

Auth::routes();

Route::middleware('auth')->group(function() {
    
    Route::get('/api/quizzes/{id}', 'TasksAPIController@tasks');
    
    Route::get('/api/quizzes/{id}/tasks', 'TasksAPIController@tasks');
    Route::post('/api/quizzes/{id}/tasks/{task_id}/check', 'TasksAPIController@check');
    Route::get('/api/quizzes/{id}/tasks/{task_id}', 'TasksAPIController@task');
    Route::post('/api/quizzes/update/{id}', 'TasksAPIController@update');
    
    Route::get('/home', 'HomeController@index')->name('home');
    
    Route::get('/quizzes', 'QuizController@index');
    Route::get('/quizzes/{id}', 'QuizController@quiz');
    Route::get('/leaderboard', 'QuizController@leaderboard');
    Route::prefix('dashboard')->middleware('auth')->group(function(){
        Route::get('/', 'QuizController@dashboard');
        Route::get('/create', 'QuizController@create');
        Route::post('/create', 'QuizController@store');
        Route::get('/{id}/edit', 'QuizController@edit');
        Route::post('/{id}/edit', 'QuizController@update');
        Route::get('/{id}/delete', 'QuizController@delete');
        Route::get('/others', 'QuizController@others')->middleware('admin');     
    });
    

});

Route::get('/ricardo', function () {return view('ricardoflex');});