<template>
    <div class="inset-0 z-50 flex items-center justify-center ">
        <div class=" p-20 pt-8 w-full ml-10 mr-10">
            <label class="header text-green-900 ">Basic Information</label>
            <!--Student Info Scrollable-->
            <div class=" overflow-x-auto overflow-y-auto max-h-96 pt-5">
               <!--(should be) profile pic-->
                <div class="flex justify-center pb-2">
                    <img src="~/assets/images/vsu.png" alt="profile" class=" h-40 w-auto">
                </div>

                <label class=" name text-green-900 flex justify-center">Jade Pogi</label>
                <label class="studentID text-green-900 flex justify-center">ID NO: 22-1-123456</label>
                <div class="mt-3">
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Grade Level & Section:</span><span>11 Javascript</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-16">Age:</span><span> 20</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Birthday:</span><span> 12-25-2004</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Gender:</span><span>Female</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Address:</span><span>1234 Pogi St. Pogi City</span></div>
                        <div class="text-green-900 text-lg pb-2 px-3"><span class="label pr-5">Contact Number/s:   </span>   <span>  +639933103211</span></div>
                </div>

                <!--Buttons-->
                <div class="flex justify-center items-center m-3">
                    <button class=" updateAnecdotal shadow w-9/12 px-10 py-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none" aria-label="Update Anecdotal">
                        Update Anecdotal Report
                    </button>
                </div>
                <div class="flex justify-center m-3">
                    <button class=" submitComplaint shadow w-9/12 px-10 py-2 rounded-lg gray text-green-900 hover:bg-gray-600 focus:outline-none" aria-label="Submit Complaint">
                        Submit and Report a Complaint
                    </button>
                </div>
                <div class="flex justify-center m-3 ">
                    <button class=" removeStudent shadow w-9/12 px-10 py-2 rounded-lg gray text-white hover:bg-gray-600 focus:outline-none" aria-label="Remove Student">
                        Remove Student
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'StudentBasicInfo',
  data() {
    return {};
  },
};
</script>

<style scoped>
.header{
    font-family: "Inter-Medium", sans-serif;
    font-size: 32px;
    font-weight: 700;
}

.name{
    font-family: "Inter-Medium", sans-serif;
    font-size: 25px;
    font-weight: 700;
}

.label{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
}

.updateAnecdotal{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #728B78;
}

.submitComplaint{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #FEFFB1;
}

.removeStudent{
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    font-weight: 700;
    background-color: #FF6161;
}

.shadow{
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.25);
}

</style>