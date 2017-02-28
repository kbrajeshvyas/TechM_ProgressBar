describe('Tests for the Tech Mahindra Progress bars directive', function() {
  var $rootScope, $scope;

  before(){
      /* Should bring the json data here or mock the same */
      testData = [
            {"barId":1, "value": 132},
            {"barId":2, "value": 15},
            {"barId":1,"value": 92}
        ]
  }
  beforeEach() {
      /* If any data need to set */
  }

  it('should have 3 progress bars for current json', function (){
      expect(testData.size()).toEqual(3);
  })

  it('upValue should increase the value by 5', function() {
    expect($scope.upValue(testData[1].value)).toEqual(20);
  })

}

