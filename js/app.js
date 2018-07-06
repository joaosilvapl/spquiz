var app = angular.module('quizApp', [])
    .controller('quizCtrl', ['$scope', 'SpGateway', 'AppSettings', '$timeout', function ($scope, spGateway, appSettings, $timeout) {
        $scope.quizVisible = false;

        $scope.result = {score:-1, quizData: null};

        $scope.calculateScore = function(data)
        {
            var score = 0;

            $.each(data.questions, function(index, value){

                var correctOption = null;

            $.each(value.options, function(i, v){
                if(v.correct){
                    correctOption = v;
                    return false;
                }
            });

                if(value.selectedAnswer == correctOption.id){
                    score++;
                }

            });

            return score;
        }
        
        $scope.startQuiz = function() {
            $scope.quizVisible = true;
        };

        $scope.send = function () {

            $scope.result = {
                score: $scope.calculateScore($scope.quizData[0]),
                quizData: $scope.quizData[0]
             };

             if(appSettings['debugVersion']===true)
             {
                alert(JSON.stringify($scope.result));

                successCallback();
             }
            else
            {
                $scope.newEventPromise = spGateway.Participate($scope.result, successCallback, errorCallback);
            }
        };

        var successCallback = function(){
            $('#finishModal').modal('show');
        }

        var errorCallback = function (jqXHR, status, error) {
            $('#errorModal').modal('show');
        }

        $scope.redirect = function(){
            window.location = appSettings['quizRankingUrl'];
        };

        $scope.quizData = [
        
            {
                id:1,
                title:'Basic1 - 10 questions',
                questions:[
                    {
                        id: 1,
                        text:'What is an a-Kasse?',
                        options:[
                            {id:1, text:'A type of shipping company' },
                            {id:2, text:'A bank operating in Scandinavia' },
                            {id:3, text:'An unemployment insurance fund', correct:true },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 2,
                        text:'When did the development of Modulus start?',
                        options:[
                            {id:1, text:'Before 2008', correct:true },
                            {id:2, text:'Between 2008 and 2012' },
                            {id:3, text:'After 2012' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 3,
                        text:'What is a Job Center?',
                        options:[
                            {id:1, text:'A career fair in the Copenhagen\'s technical university'},
                            {id:2, text:'A Modulus feature that enables users to search for a job' },
                            {id:3, text:'An institution that helps unemployed people find a job', correct:true },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 4,
                        text:'What is DMS?',
                        options:[
                            {id:1, text:'A web application used by members to interact with their a-Kasse', correct:true},
                            {id:2, text:'The codename for the Modulus Core functionality' },
                            {id:3, text:'The Danish labour ministry' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 5,
                        text:'What is SKAT?',
                        options:[
                            {id:1, text:'The Danish tax authority', correct:true},
                            {id:2, text:'The first name of Netcompany' },
                            {id:3, text:'A type of benefit paid to unemployed people in Denmark' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 6,
                        text:'What is \'Efterløn\'?',
                        options:[
                            {id:1, text:'An AfterDark event' },
                            {id:2, text:'Early retirement income', correct:true },
                            {id:3, text:'A software developed by KMD' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 7,
                        text:'If someone is unemployed in Denmark and wants to receive benefits from his a-Kasse...',
                        options:[
                            {id:1, text:'He must prove he is actively looking for a job', correct:true},
                            {id:2, text:'He must sign up for additional education' },
                            {id:3, text:'He must prove he has less than 20000 DKK in his bank account' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 8,
                        text:'A member of an a-Kasse must also be member of the parent Union?',
                        options:[
                            {id:1, text:'Yes'},
                            {id:2, text:'No', correct:true },
                            {id:3, text:'Only in the greater Copenhagen region' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 9,
                        text:'What is the purpose of the \'Modulus Connector\'?',
                        options:[
                            {id:1, text:'Enable information from Modulus to be displayed on CRM', correct:true},
                            {id:2, text:'Enable third-party vendors to invoke Modulus Core web-services' },
                            {id:3, text:'Allow members to report feature requests to the Modulus development team' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    },
                    {
                        id: 10,
                        text:'What is a \'Batch Job\'?',
                        options:[
                            {id:1, text:'A temporary job for unemployed people with lower education'},
                            {id:2, text:'An operation that runs in the background and can process data related to multiple items (members, payments, etc.)', correct:true },
                            {id:3, text:'An alternative to Windows Scheduled Tasks which can also run on Linux' },
                            {id:0, text:'I\'ve no idea' }
                        ]
                    }
                ]
            }
        
        ];

    }]);