<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TasksAPIController extends Controller
{
    //

    function tasks($id)
    {
        $tasks = \App\Task::all()->where('quizid', $id)->toArray();
        $tasks_s = [];
        foreach ($tasks as $task)
        {
            $tasks_s[] = $task;
        }
        return $tasks_s;
    }

    function check($id, $task_id)
    {
        $task = \App\Task::find($task_id);
        $checkSolutions = \App\TaskCheck::all()->where('task_id', $task_id)->where("user_id", \Auth::id());
        if ($checkSolutions->count() > 0)
        {
            return [
                "status" => $checkSolutions->completed ? "solved" : "failed"
            ];
        }

        if ($task->solution == request('solution'))
        {
            \App\TaskCheck::create([
                "user_id" => \Auth::id(),
                "task_id" => $task_id,
                "completed" => true
            ]);
            return [
                "status" => "solved"
            ];
        }
        else 
        {
            \App\TaskCheck::create([
                "user_id" => \Auth::id(),
                "task_id" => $task_id,
                "completed" => false
            ]);
            return [
                "status" => "failed",
            ];
        }
        

    }

    function update($id)
    {
        $tasks = request('tasks');
        $title = request('title');

        $quiz = \App\Quiz::findOrFail($id);
        $quiz->title = $title;
        $quiz->save();
        $errors = [];
        // Check for errors 
        foreach ($tasks as $key => $task)
        {
            if ($task['text'] == '' && !$task['deleted'])
            {
                $errors[] = [
                    'task' => $key,
                    'field' => 'text',
                    'error' => 'required'
                ];
            }
            if ($task['solution'] == '' && !$task['deleted'])
            {
                $errors[] = [
                    'task' => $key,
                    'field' => 'solution',
                    'error' => 'required'
                ];
            }
        }
        if (count($errors) > 0) return $errors;
        
        foreach ($tasks as $task)
        {
            if ($task['id'] == -1 && !$task['deleted'])
            {
                $task_n = new \App\Task();
                $task_n->text = $task['text'];
                $task_n->solution = $task['solution'];
                $task_n->teacher = \Auth::user()->id;
                $task_n->quizid = $id;

                $task_n->save();
            }
            else if ($task['deleted'])
            {
                $task_n = \App\Task::findOrFail($task['id']);
                $task_n->delete();
            }
            else
            {
                $task_n = \App\Task::findOrFail($task['id']);
                $task_n->text = $task['text'];
                $task_n->solution = $task['solution'];
                $task_n->teacher = \Auth::user()->id;
                $task_n->quizid = $id;
                
                $task_n->save();
            }
        }

        return [];
    }

    function task($id, $task_id)
    {
        return \App\TaskCheck::all()->where('task_id', $task_id)->where("user_id", \Auth::id())->first();
    }

    function quiz($id)
    {
        return \App\Quiz::findOrFail($id);
    }
}
