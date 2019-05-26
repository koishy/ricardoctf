<template>
    <div>
        <div class="grid">
            <div class="item" style="width:100%;">
                <transition-group name="fade">
                    <div class="card selected" v-for="(task, id) in tasks" :key="id" v-show="selectedTask == id">
                        {{tasks[selectedTask].text}}        
                        <input type="text" placeholder="Insert answer here">
                        <div class="btn btn-primary">Answer</div>
                    </div>
                </transition-group>
            </div>
        </div>

        <div class="grid" style="margin-top:-10px;">
            <div class="item" v-for="(task, colId) in arrangedTasks" :key="colId">
                <transition-group name="fade">
                    <div class="card" v-for="(task, id) in arrangedTasks[colId]" :key="id" v-show="selectedTask != (id*arrangedTasks.length)+colId" @click="selectedTask=(id*arrangedTasks.length)+colId">
                        <p>
                            {{task.text}}
                        </p>
                        <input type="text" placeholder="Insert answer here">
                        <div class="btn btn-primary">Answer</div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ctf-app",
    computed: {
        arrangedTasks()
        {
            var arranged = [[], [], []];
            this.tasks.forEach((e, i) => {
                arranged[i%3].push(e);                
            });
            console.log(arranged);
            return arranged;
        }
    },
    data()
    {
        return {
            tasks: [
                {text: "Task 1"},
                {text: "Task 2"},
                {text: "Task 3"},
                {text: "Task 4"},
                {text: "Task 5"},
                {text: "Task 6"}
            ],
            selectedTask: 0,
        }
    }
}
</script>

<style>
    .selected
    {
        padding: 40px;
    }
    .card > *
    {
        margin-top: 10px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform 2s, margin 2s;
    }
    .fade-enter, .fade-leave-to  {
        transform: translateX(5000px);
    }
</style>
