function iformUserParamiters(msg) {
  const message = `
Hi! If you provide your parameters as:

- **Weight**: \`.w\`  
- **Height**: \`.h\`  
- **Age**: \`.a\`  
- **Gender**: \`.g\`  
- **Physical activity coefficient"**: \`.p\` 
Sedentary (Little or No Exercise) → 1.2 : \`.p1\`
Lightly Active (Light Exercise/Sports 1-3 Days a Week) → 1.375: \`.p2\`
Moderately Active (Moderate Exercise/Sports 3-5 Days a Week) → 1.55: \`.p3\`
Very Active (Hard Exercise/Sports 6-7 Days a Week) → 1.725: \`.p4\`
Super Active (Very Hard Exercise, Physical Job, or Training Twice a Day) → 1.9: \`.p5\`


It will help us calculate your daily calorie needs and guide you to stay fit!  

For example, you can type:  
\.w 106 .h192 .a33 .g male .p4\  

Let’s get started! 🚀
  `;

  return message;
}

module.exports = { iformUserParamiters };
