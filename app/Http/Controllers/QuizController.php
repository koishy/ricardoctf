<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    //

    function index()
    {
        $quizzes = \App\Quiz::all();


        return view("quizzes/index", compact('quizzes'));
    }
    function quiz($id)
    {
        $quiz = \App\Quiz::findOrFail($id);

        return view("quizzes/quiz", compact('quiz'));
    }

    function delete($id)
    {
        $quiz = \App\Quiz::findOrFail($id);
        abort_unless($quiz->user_id == \Auth::id() || \Auth::user()->is_admin, 403);
        $quiz->hasMany(\App\Task::class, 'quizid')->delete();
        $quiz->delete();
        return redirect('/dashboard');
    }

    function dashboard()
    {
        return view("quizzes/dashboard", ["quizzes" => \App\Quiz::all()->where('user_id', \Auth::id())]);
    }

    function others()
    {

        return view("quizzes/dashboard_others", ["quizzes" => \App\Quiz::all()->where('user_id', '!=', \Auth::id())]);
    }

    function leaderboard()
    {
        $users = \App\User::all();

        $users = $users->sort(function ($a, $b) {
            return $a->rank() < $b->rank();
        });

        return view("quizzes/leaderboard", compact('users'));

    }

    function create()
    {
        return view('quizzes/create');
    }

    function edit($id)
    {
        return view('quizzes/edit', ["quiz" => \App\Quiz::findOrFail($id)]);
    }

    function update($id)
    {

        request()->validate([
            'title' => 'required'
        ]);

        $quiz = \App\Quiz::findOrFail($id);
        $quiz->title = request('title');
        
        $quiz->save();


        return redirect('/dashboard');
    }

    function store()
    {
        request()->validate([
            'title' => 'required'
        ]);

        $quiz = \App\Quiz::create([
            'title' => request('title')
        ]);

        $quiz->user_id = \Auth::id();

        $quiz->save();


        return redirect('/dashboard/'.$quiz->id.'/edit');
    }
}
