<script setup>
import { ref } from "vue";

import dataLab from "@/utils/api.js";
import { useChartStore } from "@/stores/chart.js";
const chartStore = useChartStore();

const startDate = ref("");
const endDate = ref("");
const timeUnit = ref("month");
const deviceEnvironment = ref("all");
const genderData = ref("all");
const ageData = ref("all");
const keywordGroups = ref([]);
const userInputGroupName = ref("");
const userInputKeyword = ref("");
const tempGroupName = ref("");
const tempKeywords = ref([]);
const toApiData = ref({});

function tempGroupAdd() {
  tempGroupName.value = userInputGroupName.value;
  userInputGroupName.value = "";
}

function tempKeywordAdd() {
  tempKeywords.value.push(userInputKeyword.value);
  userInputKeyword.value = "";
}

function makeGroup() {
  console.log(tempGroupName)
  keywordGroups.value.push({
    groupName: tempGroupName.value,
    keywords: tempKeywords.value,
  });
  tempGroupName.value = "";
  tempKeywords.value = [];
  userInputGroupName.value = "";
}

async function sendResultToApi() {
  toApiData.value = {
    startDate: startDate.value,
    endDate: endDate.value,
    timeUnit: timeUnit.value,
    device: deviceEnvironment.value,
    gender: genderData.value,
    ages: ageData.value,
    keywordGroups: keywordGroups.value,
  };
  console.log(toApiData);
  await dataLab.post(toApiData.value);
  await chartStore.makeChart();
}
</script>

<template>
  <div class="d-flex flex-wrap">
    <div class="card mb-3 mx-3 flex-fill" style="min-width: 300px;">
      <div class="card-header">날짜 지정</div>
      <div class="card-body">
        <div class="d-flex">
          <div class="me-3">
            <label for="startDate" class="form-label">시작일</label>
            <input type="date" id="startDate" class="form-control" v-model="startDate"/>
          </div>
          <div class="me-3">
            <label for="endDate" class="form-label">종료일</label>
            <input type="date" id="endDate" class="form-control" v-model="endDate"/>
          </div>
          <div>
            <label for="timeUnit" class="form-label">시간 단위</label>
            <select id="timeUnit" class="form-select" v-model="timeUnit">
              <option value="date">일간</option>
              <option value="week">주간</option>
              <option value="month">월간</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-3 mx-3 flex-fill" style="min-width: 300px;">
      <div class="card-header">장비 환경</div>
      <div class="card-body">
        <label for="deviceEnvironment" class="form-label">장비 환경</label>
        <select id="deviceEnvironment" class="form-select" v-model="deviceEnvironment">
          <option value="all">모든 장비</option>
          <option value="pc">컴퓨터</option>
          <option value="mo">모바일</option>
        </select>
      </div>
    </div>
    <div class="card mb-3 mx-3 flex-fill" style="min-width: 300px;">
      <div class="card-header">사용자 정보 지정</div>
      <div class="card-body">
        <div class="d-flex">
          <div class="me-3">
            <label for="genderData" class="form-label">성별</label>
            <select id="genderData" class="form-select" v-model="genderData">
              <option value="all">모든 성별</option>
              <option value="m">남성</option>
              <option value="f">여성</option>
            </select>
          </div>
          <div>
            <label for="ageData" class="form-label">연령</label>
            <select id="ageData" class="form-select" v-model="ageData">
              <option value="all">모든 연령</option>
              <option value="1">0∼12세</option>
              <option value="2">13∼18세</option>
              <option value="3">19∼24세</option>
              <option value="4">25∼29세</option>
              <option value="5">30∼34세</option>
              <option value="6">35∼39세</option>
              <option value="7">40∼44세</option>
              <option value="8">45∼49세</option>
              <option value="9">50∼54세</option>
              <option value="10">55∼59세</option>
              <option value="11">60세 이상</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-3 mx-3 flex-fill" style="min-width: 300px;">
      <div class="card-header">검색 정보 지정</div>
      <div class="card-body">
        <div class="mb-3 d-flex align-items-center">
          <label for="userInputGroupName" class="form-label me-2">그룹명</label>
          <input type="text" id="userInputGroupName" class="form-control me-2" v-model="userInputGroupName"
                 style="max-width: 200px;"/>
          <button class="btn btn-primary" v-on:click="tempGroupAdd">추가</button>
          <div class="ms-2 card p-2"><strong>{{ tempGroupName }}</strong></div>
        </div>
        <div class="mb-3 d-flex align-items-center">
          <label for="userInputKeyword" class="form-label me-2">키워드</label>
          <input type="text" id="userInputKeyword" class="form-control me-2" v-model="userInputKeyword"
                 style="max-width: 200px;"/>
          <button class="btn btn-primary" v-on:click="tempKeywordAdd">추가</button>
          <div class="card ms-2">
            <ul class="list-group list-group-horizontal list-group-flush">
              <li class="list-group-item" v-for="(keyword, index) in tempKeywords" v-bind:key="index"
                  style="border-right: 1px solid #dee2e6;">
                {{ keyword }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-3">
          <button class="btn btn-success" v-on:click="makeGroup">그룹 확정</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-3 mx-3 flex-fill" style="min-width: 300px;">
    <div class="card-header">사용자 입력 그룹별 키워드</div>
    <ul v-if="keywordGroups.length" class="list-group mb-3 mx-3 mt-3 flex-fill">
      <li v-for="(keywordGroup, index) in keywordGroups" v-bind:key="index" class="list-group-item">
        <p>그룹 이름: {{ keywordGroup.groupName }}</p>
        <p>그룹 키워드: {{ keywordGroup.keywords }}</p>
      </li>
    </ul>
  </div>
  <div class="mt-5 d-flex" style="padding: 20px;">
    <input type="reset" class="btn btn-secondary btn-lg ms-2 me-3" v-on:click="keywordGroups = []" value="초기화"/>
    <input type="submit" class="btn btn-info btn-lg" v-on:click="sendResultToApi" value="결과 보기"/>
  </div>


</template>


<style scoped>

</style>