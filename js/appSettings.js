'use strict';

app.factory('AppSettings', [function(){
  return {
  	title: 'Modulus Knowledge Quiz',
    webUrl: 'https://goto.netcompany.com/cases/GTO22/NCMOD/',
    listName: 'KnowledgeQuiz',
    quizUrl: 'https://goto.netcompany.com/cases/GTO22/NCMOD/SiteAssets/KnowledgeQuiz/index.html',
    quizRankingUrl: 'https://goto.netcompany.com/cases/GTO22/NCMOD/SiteAssets/KnowledgeQuiz/ranking.html',
    debugVersion: true
  };
}]);