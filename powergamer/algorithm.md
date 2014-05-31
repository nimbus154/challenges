# Description
Powergamers try to create a character that does the most damage, has the most
hitpoints, etc. Rather than scouring the rulebooks, it'd be better to have an
algorithm find the best character.

In D&D 4, there are two major factors in power:
	* powers
	* ability scores
	* weapon

Power descriptions might read "1[W] + [WIS]" damage, which means "1 weapon +
wisdom" damage.

Input, then, would be a set of powers for a class.
Output should be a subset of those powers and ability scores.

However, skills are not so straightforward. They have various effects, and they
often synergize with others in unique ways.

The basic "find the ability scores that yield the most powerful charater"
algorithm seems like a knapsack problem, but it doesn't cover the interesting
part of character creation. Seeing possibilities such as stunlock and perpetual
backstab and such is beyond the scope of my algorithm writing abiltiies at the
moment-- because I'd like the algorithm to arrive at those possibilities itself.
You could, of course, weight the powers or devise a weighting system for them,
but that would be based on assumptions such as "stun is better than prone" or
"multiple target damage is better than single target damage." These would have
to be heuristics that you pass in: strategies or configuration options. Plus,
balance is nice; being a pure condition-applier is only good if you have a
damage dealer. Forced movement is fun but not as useful if you need to deal
damage.

How about a game like Diablo II? There are four abilities and a smaller tech
tree. There are dependencies between items in the tree, and they may have an
effect on one another. This game was more about pure damage.

Again, you need to weight the positives of attack speed against those of damage.
But damage is king here, but then why not max out "might" and "charge"?

# Problem Specification

