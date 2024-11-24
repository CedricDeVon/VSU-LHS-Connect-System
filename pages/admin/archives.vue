<template>
    <main class="flex flex-col rounded-none">
      <section
        class="px-20 py-14 w-full bg-white rounded-xl shadow-[-8px_8px_10px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
      >
        <div class="flex gap-5 max-md:flex-col">
          <section class="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <article class="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
              <h1
                class="self-end mr-40 text-4xl font-bold text-center text-green-900 max-md:mr-2.5"
              >
                Archives
              </h1>
              <div class="mt-14 max-md:mt-10 max-md:max-w-full">
                <div class="flex gap-5 max-md:flex-col">
                  <nav class="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
                    <ul
                      class="flex flex-col grow text-xl text-center text-neutral-500 max-md:mt-2.5"
                    >
                      <li
                        class="flex flex-col items-center px-5 pt-7 pb-40 bg-white rounded-md border border-solid border-black border-opacity-40 max-md:pr-5 max-md:pb-24"
                      >
                        <button tabindex="0">Academic Year 2019-2020</button>
                        <hr
                          class="shrink-0 self-stretch mt-5 w-full h-px border border-solid border-neutral-500"
                        />
                        <button tabindex="0" class="mt-5">
                          Academic Year 2020-2021
                        </button>
                        <hr
                          class="shrink-0 self-stretch mt-4 w-full h-px border border-solid border-neutral-500"
                        />
                        <button tabindex="0" class="mt-5">
                          Academic Year 2021-2022
                        </button>
                        <hr
                          class="shrink-0 self-stretch mt-5 w-full h-px border border-solid border-neutral-500"
                        />
                        <button tabindex="0" class="mt-5">
                          Academic Year 2022-2023
                        </button>
                        <hr
                          class="shrink-0 self-stretch mt-5 w-full h-px border border-solid border-neutral-500"
                        />
                        <button tabindex="0" class="mt-5">
                          Academic Year 2023-2024
                        </button>
                        <hr
                          class="shrink-0 self-stretch mt-8 w-full h-px border border-solid border-neutral-500"
                        />
                        <button tabindex="0" class="mt-5 mb-0 max-md:mb-2.5">
                          Academic Year 2024-2025
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <section class="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
                    <div
                      class="flex flex-col w-full max-md:mt-2.5 max-md:max-w-full"
                    >
                      <form class="flex flex-wrap gap-2.5 text-xl font-medium text-black text-opacity-60">
                        <div class="flex flex-col grow shrink-0 basis-0 w-fit">
                          <div
                            class="flex gap-7 py-px pr-px pl-6 bg-white border border-solid border-black border-opacity-60 max-md:pl-5"
                          >
                            <label for="semesterSelect" class="sr-only">Select Semester</label>
                            <select 
                              id="semesterSelect"
                              class="grow shrink my-auto w-[139px] bg-transparent"
                              aria-label="Select Semester"
                            >
                              <option value="">Select Semester</option>
                            </select>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/deef113e-5d69-4016-ba59-c84121a1145f?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
                              alt=""
                              class="object-contain shrink-0 bg-white aspect-[1.21] w-[74px]"
                            />
                          </div>
                        </div>
                        <div class="flex flex-col">
                          <div
                            class="flex gap-3.5 py-px pr-px pl-5 bg-white border border-solid border-black border-opacity-60"
                          >
                            <label for="sectionSelect" class="sr-only">Select Section</label>
                            <select
                              id="sectionSelect" 
                              class="grow my-auto bg-transparent"
                              aria-label="Select Section"
                            >
                              <option value="">Select Section</option>
                            </select>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/73ac516a-3c80-47a2-9333-26d4a2bb9b40?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
                              alt=""
                              class="object-contain shrink-0 bg-white aspect-[1.16] w-[71px]"
                            />
                          </div>
                        </div>
                      </form>
                      <section class="flex flex-col mt-3.5 max-w-full w-[340px]">
                        <h2 class="text-sm text-neutral-700 max-md:mr-2.5">
                          11 Delta Academic Year 2024-2025, 1st Semester
                        </h2>
                        <ul
                          class="flex flex-col px-2.5 pt-3.5 pb-20 mt-7 text-base text-center text-black rounded-xl border border-solid border-black border-opacity-30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                        >
                          <li class="self-center">Ang, Chritsina Mae</li>
                          <hr
                            class="shrink-0 mt-3.5 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:mr-1"
                          />
                          <li class="self-center mt-5">Aquino, Dolores</li>
                          <hr
                            class="shrink-0 mt-3.5 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:mr-1"
                          />
                          <li class="self-center mt-4">Cruz, MAria</li>
                          <hr
                            class="shrink-0 mt-4 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:mr-1"
                          />
                          <li class="self-center mt-5">Gonzales Faith</li>
                          <hr
                            class="shrink-0 mt-4 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:mr-1.5"
                          />
                          <li class="self-center mt-4">Mendoza, Juanita</li>
                          <hr
                            class="shrink-0 mt-4 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:ml-1.5"
                          />
                          <li class="self-center mt-5">Ricalde, Antonio</li>
                          <hr
                            class="shrink-0 mt-4 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:ml-1.5"
                          />
                          <li class="self-center mt-4">Santiago, Jose</li>
                          <hr
                            class="shrink-0 mt-3.5 max-w-full h-px border border-solid border-black border-opacity-50 w-[316px] max-md:ml-1.5"
                          />
                        </ul>
                      </section>
                    </div>
                  </section>
                </div>
              </div>
            </article>
          </section>
          <aside class="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <article
              class="flex flex-col items-start mt-44 w-full text-sm text-neutral-700 max-md:mt-10"
            >
              <header
                class="flex flex-col items-start self-stretch pr-16 pl-5 text-base text-center max-md:pr-5"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5408559103860d3590b3ebde3984d70c9e0821aa75f80816469618bf1ac94a5?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
                  alt="Student profile photo"
                  class="object-contain ml-16 aspect-square shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[78px] max-md:ml-2.5"
                />
                <h3 class="mt-3 font-bold">Christina Mae Jiminea Ang</h3>
                <p class="ml-9 max-md:ml-2.5">ID NO: 20-1-01123</p>
              </header>
              <dl class="mt-5 w-full">
                <div class="flex mb-2">
                  <dt class="font-semibold">Grade Level & Section:</dt>
                  <dd class="ml-2">11 Baltazar</dd>
                </div>
                <div class="flex gap-4 mt-2 whitespace-nowrap">
                  <dt class="font-semibold">Age:</dt>
                  <dd>17</dd>
                </div>
                <div class="flex gap-2.5 mt-2 whitespace-nowrap">
                  <dt class="font-semibold">Gender:</dt>
                  <dd>Female</dd>
                </div>
                <div class="flex gap-2.5 self-stretch mt-2.5">
                  <dt class="font-semibold">Address:</dt>
                  <dd class="grow shrink w-[229px]">
                    Brgy. Tambulilid, Ormoc City, Leyte
                  </dd>
                </div>
                <div class="mt-2.5">
                  <dt class="font-semibold inline">Contact Number/s:</dt>
                  <dd class="inline ml-2">0987654321</dd>
                </div>
              </dl>
              <nav class="w-full mt-7">
                <button
                  class="w-full px-16 py-3 text-sm font-medium text-center text-white rounded-lg bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5"
                  tabindex="0"
                >
                  See Anecdotal Report
                </button>
                <button
                  class="w-full px-14 py-3 mt-3.5 text-sm font-medium text-center text-white rounded-lg bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5"
                  tabindex="0"
                >
                  See Incident Report(s)
                </button>
              </nav>
            </article>
          </aside>
        </div>
      </section>
    </main>
  </template>
  
<script>
import {defineComponent} from 'vue';
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';

export default {
    name: 'ArchivesView',
    components: { AdminSidebar, AdminHeader },
}
</script>