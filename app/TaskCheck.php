<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskCheck extends Model
{
    //
    protected $fillable = ["user_id", "task_id", "completed"];
}
