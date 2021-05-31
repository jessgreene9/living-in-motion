

 var quoteBank = [
"'The pain you feel today, will be the strength you feel tomorrow.'",
"'Do something today that your future self will thank you for.'",
"'When you feel like quitting, think of why you started.'",
"'You are worth it. Keep going.'",
"'All progress takes place outside the comfort zone.'",
"'Stay patient and trust your journey.'",
"'The key to success is to focus on goals, not obstacles.'",
"'Don't limit your challenges. Challenge your limits.'",
"'The distance between your dreams and reality is called action.'",
"'One day or day one. You decide.'",
"'Difficult roads often lead to beautiful destinations.'",
"'Be yourself. Everyone else is already taken.'",
"'Strive for progress, not perfection.'",
"'Believe you can, and your halfway there.'",
"'Each morning we are born again. What we do today matters most.'",
"'Take a deep breath and remember that where you are now isn't where you are going to end up.'",
"'Let us make our future now, and let us make our dreams tomorrow's reality.'",
 ];



function newQuote(){
    var randomNumber = Math.floor(Math.random()* quoteBank.length);
    document.getElementById("quoteDisplay").innerHTML = quoteBank[randomNumber]; 
}

newQuote();
