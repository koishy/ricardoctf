<template>
    <div>
        <div class="grid" style="margin-top: 50px;">
            <div :class="`card task ${selectedTask == id ? 'task-selected' : ''}`" v-for="(task, id) in tasks" :key="id"
                @click="selectedTask = task">
                <p>
                    {{task.text}}
                </p>
                <input type="text" placeholder="Insert answer here" v-model="task.answer" @keyup.enter="checkTask(id)">
                <div :class="`btn ${getTaskButtonState(id)}`" @click="checkTask(id)">
                    <i v-if="isAuthor">You can't take your own quiz</i>
                    <i v-else-if="task.checked" class="mdi mdi-check"></i>
                    <i v-else-if="task.failed" class="mdi mdi-close"></i>

                    <span v-else>Send</span>
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
                this.tasks = res.data;
                this.tasks.forEach((e) => {
                    e.answer = "";
                    axios.get('/api/quizzes/' + this.quizId + '/tasks/' + e.id).then((res) => {
                        if (res.data == "") return;
                        e.checked = res.data.completed;
                        e.failed = !res.data.completed;
                        this.$forceUpdate();
                    })
                })
            })

        },
        props: {
            quizId: Number,
            isAuthor: Boolean
        },
        computed: {

        },
        methods: {
            checkTask(taskId) {
                var task = this.tasks[taskId];
                if (task.failed || task.checked) return; // Stop animation from repeatedly playing

                axios.post("/api/quizzes/" + this.quizId + "/tasks/" + task.id + "/check", querystring.stringify({
                    solution: task.answer
                })).then((res) => {
                    if (res.data.status == "solved") {
                        task.checked = true;
                    } else {
                        task.failed = true;
                    }
                    this.$forceUpdate();
                });


            },
            getTaskButtonState(taskId) {
                
                var task = this.tasks[taskId];
                if (this.isAuthor) {
                    task.checked = true;
                    return "btn-disabled";
                } else if (task.checked) {
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
                tasks: [],
                selectedTask: 0,
                quiz: {},
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

    .task-selected {
        transform: scale(1.04);
    }

    .task-failed {
        animation: shake 1s;
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
