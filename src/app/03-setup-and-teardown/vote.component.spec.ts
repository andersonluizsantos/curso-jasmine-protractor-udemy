import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  //Arrange
  let componente: VoteComponent;
  
  beforeEach(() => {
    //Arrange
    componente = new VoteComponent();
  })

  it('should increment total votes when upvoted', () => {
    //Act
    componente.upVote();
    // Assert
    expect(componente.totalVotes).toBe(1);
  });

  it('should decrement total votes when downvoted', () => {
    //Act
    componente.downVote();
    // Assert
    expect(componente.totalVotes).toBe(-1);
  });
});