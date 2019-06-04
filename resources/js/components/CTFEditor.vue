<template>
    <div>
      <div class="checkmark">
        <div :class="`ball ${ status != 'hidden' ? 'active' : ''}`">
          <i v-show="status == 'success'" class="mdi mdi-check" style="color: #ccc; font-size: 40px;"></i>
          <i v-show="status == 'fail'" class="mdi mdi-close" style="color: #ccc; font-size: 40px;"></i>

        </div>
      </div>
        <div class="grid" style="margin-top: 50px;">
            <div v-for="(task, id) in tasks" :key="id" v-show="!task.deleted">
                <div :class="`card task ${(selectedTask == id) ? 'task-selected' : ''}`" @click="selectedTask=id">

                    <div class="right">
                        <div class="btn btn-danger" @click="removeTask(id)">
                            <i class="mdi mdi-close"></i>
                        </div>
                    </div>
                    <div style="float:left;"> 
                      <textarea type="text" name="text" id="text" :class="`textEditor ${task.errors.text ? 'textEditorError' : ''}`" v-model="task.text"></textarea>
                      <input type="text" placeholder="Solution" :class="task.errors.solution ? 'textEditorError' : ''" v-model="task.solution">
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </div>
            <div class="card-placeholder add" @click=addTask()>+</div>
        </div>
        <div class="container">
            <div class="card">
                <div class="container">
                    <label>
                        <input type="text" name="title" required placeholder="Quiz title" v-model="title" style="border: none; border-bottom: 2px dashed rgba(0, 0, 0, 0.1); font-size: 2em; padding: 0;">
                    </label>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 40px;" @click="save">Save
                        everything</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        setTimeout
    } from 'timers';
    import querystring from 'querystring';


    export default {

        name: "ctf-app",
        mounted() {
            axios.get('/api/quizzes/' + this.quizId + '/tasks').then((res) => {
              console.warn(res.data);
                this.tasks = res.data;
                this.tasks.forEach((e) => {
                  e.deleted = false;
                  e.errors = {};

                })
            })



        },
        props: {
            title: String,
            quizId: Number
        },
        methods: {

            save() {
                console.log(this.tasks);
                axios.post('/api/quizzes/update/'+this.quizId, {title: this.title, tasks: this.tasks}).then((e) => {
                  var errors = e.data;
                  console.log(errors);
                  errors.forEach((err) => {
                    this.tasks[err.task].errors[err.field] = true;
                    setTimeout(() => {
                      this.tasks[err.task].errors = [];
                    }, 2000);
                    
                  });
                  if (errors.length == 0)
                  {
                    this.status = 'success';
                    setTimeout(() => {
                      this.status = 'hidden';
                      this.$forceUpdate();

                    }, 3000);
                  }
                  else
                  {
                    this.status = 'fail';
                    setTimeout(() => {
                      this.status = 'hidden';
                      this.$forceUpdate();

                    }, 3000);
                  }
                  
                  this.$forceUpdate();
                  
                });

            },
            addTask() {
                this.tasks.push({
                    text: "",
                    solution: "",
                    id: -1,
                    deleted: false,
                    errors: {}
                })
            },
            removeTask(id)
            {
              if (this.tasks[id].id == -1) {
                this.tasks.splice(id, 1);
                return;
              }
              this.tasks[id].deleted = true;
              this.$forceUpdate();
            },
            getTaskButtonState(taskId) {
                var task = this.tasks[taskId];
                if (task.checked) {
                    return "btn-success";
                } else if (task.failed) {
                    return "btn-danger task-failed";
                } else {
                    return "btn-primary";
                }
            }
        },
        data() {
            return {
                status: 'hidden',
                tasks: [],
                selectedTask: 0,
            }
        }
    }

</script>

<style>
    .btn {
        transition: .5s all !important;
    }

    .selected {
        padding: 40px;
    }

    .task>* {
        margin-top: 10px;
    }

    .task {
        transition: .5s all;
    }

    .right {
        float: right;
    }

    .task-selected {
        transform: scale(1.04);
    }

    .task-failed {
        animation: shake 1s;
    }

    .add {
        font-size: 50px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .5s all;
        cursor: pointer;
    }

    .add:hover {
        transform: scale(1.04);
        background: rgba(0, 0, 0, 0.05);
    }

    .textEditor {
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 5px;
        resize: vertical;
    }
    
    .textEditorError {
      border-color: crimson !important;
    }
    .ball
    {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      position: fixed;
      left: 50%;
      top: -100px;
      transition: 1s transform;
      transform: translateX(-50%);
    }

    .ball.active 
    {
      transform: translateX(-50%) translateY(200px) rotate(360deg);

    }

    @keyframes shake {
        0% {
            transform: translateX(-50px);
        }

        10% {
            transform: translateX(50px);
        }

        20% {
            transform: translateX(-50px);
        }

        30% {
            transform: translateX(50px);
        }

        40% {
            transform: translateX(-50px);
        }

        50% {
            transform: translateX(50px);
        }

        60% {
            transform: translateX(-50px);
        }

        80% {
            transform: translateX(50px);
        }

        90% {
            transform: translateX(-50px);
        }

        100% {
            transform: translateX(0);
        }
    }

</style>
