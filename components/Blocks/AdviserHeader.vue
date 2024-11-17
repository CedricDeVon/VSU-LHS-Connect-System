<template>
    <div class = "admin-header h-14 w-screen flex items-center ">

        <div class="px-5 w-full flex justify-between items-center">
            <div class="flex space-x-4">
                <button @click="goToHomepage" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Homepage">
                    Homepage
            </button>  
            <button @click="goToAdvisory" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Advisory">
                    Advisory
            </button> 
            <button @click="goToReports" 
                    class="button px-7 py-2 rounded-lg focus:outline-none"
                    aria-label="Reports">
                    Reports
            </button> 
            </div>

            <header class="flex justify-end items-center p-4">
            <div class="flex items-center gap-5">
                <button class="hover:scale-110 cursor-pointer focus:outline-none">
                    <img @click="notifClick" loading="lazy"
                    src="~/assets/icons/bell.svg"
                    alt="Notifications" class="w-8 object-contain aspect-square " />
                </button>
                
                <button @click="goToSettings" class="hover:scale-110 cursor-pointer focus:outline-none">
                    <img loading="lazy"
                    src="~/assets/icons/menu.svg"
                    alt="Menu" class="w-8 object-contain aspect-square " />
                </button>
            </div>
            </header>
           
        
        </div>
    </div>
</template>

<script>

export default {
name: 'AdviserHeader',

methods: {
    goToHomepage(){
        // this.$router.push('/adviser/homepage')
    },
    goToAdvisory(){
        this.$router.push('/adviser/advisory')
    },
    goToReports(){
        this.$router.push('/adviser/reports')
    },
    goToSettings(){
        this.$router.push('/adviser/settings')
    },
    notifClick(){
        this.$emit('notif-click')
    }
}
}


</script>
<style scoped>
.admin-header{
    font-family: 'Century Gothic', sans-serif;
    background: #265630;
}

.button{
    font-family: 'Century Gothic', sans-serif;
    font-size: 17px;
    font-weight: 500;
    background-color: #265630;
    color: white;
    border: none;
    cursor: pointer;
}

.button:hover{
    background-color: white;
    color: #265630;
}



</style>
