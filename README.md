ChainGameDao Lottory game is a blockchain game, deployed on Polygon Network. 

<img src="https://www.chainlabsdao.com/images/dapp_macbookgrey_front.png">


HOW TO GET STARTED?

Clone this repo by running 

git clone https://github.com/chain-games-dao/fontend.git 

from your terminal

cd into frontend and run 

yarn or npm install to install all the packages

Create an env. file at the root of the project and add your infura or alchemy projectId

NEXT_PUBLIC_ALCHEMY_KEY=

e.g NEXT_PUBLIC_ALCHEMY_KEY= ndhhfjfjfhjfjfj

Run the project using 

yarn dev or npm run dev

</br></br>

<h1>You want to test it?</h1>

<a href='https://chaingamedao.vercel.app/'>
LIVE TESTNET 
</a>

</br></br>

<h1>How to play?</h1>

A player can buy tickets using MATIC. 

<ul>
<li>Purchasing of multiple tickets is allowed.</li>
<li>The minimum ticket you can buy is 1 and maximum is 100.</li>
<li>The maximum tickets per draw is 100</li>
<li>
The tickets sale  closes within the stipulated period </li>
<li>
The draw will be run to pick the winner 
</li>
<li>
If you won you would see a withdraw button when you connect you wallet
</li>
<ul>



</br>
</br>
ADMIN WRITE FUNCTIONS

<ul>
<li>DrawWinnerTicket</li>
<li>RefundAll</li>
<li>WithdrawCommission</li>
<li>
restartDraw
</li>
</ul>

</br>
</br>


PLAYERS WRITE FUNCTIONS


<ul>
<li>
BuyTickets
</li>
<li>
WithdrawWinnings
</li>
</li>
</ul>

</br>
</br>


READ FUNCTIONS

<ul>

<li> CurrentWinningReward </li>
<li> IsWinner </li>
<li> RemainingTickets</li>
<li> checkWinningsAmount </li>
<li>getTickets </li>
<li> getWinningsForAddress</li>
<li>lastWinner </li>
<li> lastWinnerAmount</li>
<li>operatorTotalCommission </li>
<li> winnings</li> etc
</ul>