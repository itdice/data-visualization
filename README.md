# Naver DataLab - Data Visualization
**express**, **axios**등의 Back-end 기술을 이용하여 Naver DataLab의 검색 데이터 기록을 불러오고,
**Vue.js**, **Bootstrap**등의 Front-end 기술을 응용하여 검색 기록 데이터를 받아 출력해주는 홈페이지를 구축한다.
- **기간**을 설정하고, 기간의 단위도 설정할 수 있다. (월간, 주간, 일간으로 선택)
- 검색한 **장비**에 따른 검색 기록을 별도로 조회해 볼 수 있다. (컴퓨터, 모바일)
- 검색한 사용자의 **성별 및 나이대**를 선택하여 특정 분류군의 검색 기록만 확인할 수 있다.


## Preview
![Main-Page](https://github.com/itdice/data-visualization/blob/master/Capture/mainPage.PNG?raw=true)
> 기본적으로 표시되는 메인 페이지, 가장 마지막으로 조회한 검색 기록 데이터를 표시해주고 있다.

![Keyword-Input](https://github.com/itdice/data-visualization/blob/master/Capture/keywordInput.PNG?raw=true)
> 검색 기록 필터를 설정하고, 검색 키워드를 입력하는 과정이다.

![Keyword-Complete](https://github.com/itdice/data-visualization/blob/master/Capture/keywordComplete.PNG?raw=true)
> 키워드를 여러가지 입력하여 서로 비교해볼 수 있다.

![Result](https://github.com/itdice/data-visualization/blob/master/Capture/result.PNG?raw=true)
> 최종적으로 결과 보기를 누르면 최대 검색 기록에 비해서 어느 정도의 비율로 검색이 되었는지 그래프로 나타나게 된다.