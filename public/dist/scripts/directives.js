(function() {
    function GetElements() {
      return {
    link: function (scope, element, attrs) {

      var documentResult = document.getElementsByClassName("leftHeaderRectangle");
      console.log('document.getElementsByClassName: ', documentResult);

      var wrappedDocumentResult = angular.element(documentResult);
      console.log('angular.element: ', wrappedDocumentResult);

    }
  };
}
  angular
      .module('BlocChat')
      .directive('GetElements', [GetElements]);
})();
