'use strict';

app.factory('SpGateway', ['AppSettings', function(appSettings) {
  return {
	Participate: function(result, successCallback, errorCallback) {
        this.GetRequestDigestValue(this.ParticipateInternal, result, successCallback, errorCallback);
    },

    ParticipateInternal: function (requestDigestValue, result, successCallback, errorCallback) {
        var itemType = "SP.Data.KnowledgeQuizListItem";
        var itemProperties = {
            'QuizId': result.quizData.id.toString(),
            'Score': result.score.toString(),
            'Properties': JSON.stringify(result)
        };
        itemProperties["__metadata"] = { "type": itemType };

        $.ajax(
            {
                type: 'post',
                url: appSettings['webUrl'].replace(/\/*$/, '') + '/_api/web/lists/GetByTitle(\'' + appSettings.listName + '\')/items',
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(itemProperties),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigestValue
                },
                success: successCallback,
                error: errorCallback
            }
        );
    },

    GetRequestDigestValue: function (successCallback, result, innerSuccessCallback, errorCallback) {

        $.ajax({
            type: 'post',
            url: appSettings['webUrl'].replace(/\/*$/, '') + '/_api/contextinfo',
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json; odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) { 
                successCallback(data.d.GetContextWebInformation.FormDigestValue, result, innerSuccessCallback, errorCallback);
            },
            error: errorCallback
        });
    },

	GetCurrentUserInfo: function() {
	    return $($($.ajax(
	        {
	            type: 'get',
	            async: false,
	            url: appSettings['webUrl'].replace(/\/*$/, '') +
	                '/_layouts/userdisp.aspx?Force=True&' +
	                (new Date()).getTime()
	        }
	    ).responseText).find('#SPFieldText')[1]).text().replace(/^[\s\r\n ]+/mg, '').replace(/[\s\r\n ]+$/mg, '');
	}
	
  };
}]);