#!/usr/bin/env bash -e

# colors
orange='\033[0;33m'
green='\033[0;32m'
white='\033[1;37m'
red='\033[0;31m'
cyan='\033[0;36m'

cat << "EOF"
 __          __             _               ____        _ _     _ _              _
 \ \        / /            | |             |  _ \      (_) |   | | |            | |
  \ \  /\  / /__   ___   __| | ___   ___   | |_) |_   _ _| | __| | |_ ___   ___ | |
   \ \/  \/ / _ \ / _ \ / _` |/ _ \ / _ \  |  _ <| | | | | |/ _` | __/ _ \ / _ \| |
    \  /\  / (_) | (_) | (_| | (_) | (_) | | |_) | |_| | | | (_| | || (_) | (_) | |
     \/  \/ \___/ \___/ \__,_|\___/ \___/  |____/ \__,_|_|_|\__,_|\__\___/ \___/|_|

EOF

echo "${cyan}Installing Woodoo Frontend Buildtool PreInstall ...${white}"

if [ -d "./core" ]; then
    echo "${green}✔ Woodoo core folder found${white}"
else
	echo "${red}Setup not finished!${white} - Woodoo core folder not found!"
	exit
fi

## ======================================================================================================================
## Check if gulpfile_config exists
## ======================================================================================================================

if [[ -e "gulp_config.json" ]]; then
    echo "${green}✔ gulp_config.json found!${white}"
else
	read -r -p "gulp_config.json not found. Create it? [Y/N]: " response
	if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
	then
		cp core/gulp_config.json gulp_config.json
		echo "${green}✔ gulp_config.json successfully created!${white} - Please edit ${orange}gulp_config.json${cyan} and run this Setup ${red}again${white}."
		exit
	else
		echo "${red}Setup not finished! - gulp_config.json is necessary!${white}"
		exit
	fi
fi


## ======================================================================================================================
## Check if gulpfile exists
## ======================================================================================================================

if [[ -e "gulpfile.js" ]]; then
    echo "${green}✔ Gulpfile found!${white}"
else
	read -r -p "gulpfile.js not found. Create it? [Y/N]: " response
	if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
	then
		cp core/gulpfile.example.js gulpfile.js
		echo "${green}✔ gulpfile.js successfully created!${white}"
	else
		echo "${red}Setup not finished! - gulpfile.js is necessary!${white}"
		exit
	fi
fi

## =======================================================================================================================
## Include Project package.json to Woodoo Buildtool Node-Packages
## =======================================================================================================================

echo "\n"
echo "${cyan}Merge package.json ${white}"
	read -r -p "Did you already configured bin/gulp_config.json ...? [Y/N]: " configured
	if [[ "$configured" =~ ^([yY][eE][sS]|[yY])+$ ]]

	then
		read -r -p "Merge or update package.json with Buildtool? [Y/N]: " response
		if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
		then
			cp core/package.json package.json
		    npm install
		    echo "${green}✔ Woodoo-Dependencies preinstalled!${white}"
		    echo "${cyan}Start merge process ...!${white}"

			echo "${cyan}Generate local package.json${white}"
			gulp merge_json
			if [[ -e "./package.json" ]];
				then
					echo "${green}✔ package.json succesfully merged!${white}"
				fi
			echo "\n"
			echo "${cyan}Install Woodoo Buildtool with Project-Dependencies now ...${white}"
			npm install
			echo "${green}✔ Setup finished!${white}"
		else
			echo "${red}Note: Merge is skipped! Package.json was not merged!${white}"
			echo "\n"
			echo "${cyan}Install Woodoo Buildtool ${red}without current${cyan} Project-Dependencies...${white}"
			cp core/package.json package.json
			npm install
			echo "${green}✔ Setup finished!${white}"
		fi
		exit
	else
		echo "\n"
		echo "${green}✔ ${red}Setup stopped!\n ${white}Please edit this file with your Project Variables: ${orange}./bin/gulp_config.json${white}"
		echo "\n"
		exit
	fi
