# -*- mode: ruby -*-
# vi: set ft=ruby :


VAGRANT_BOX = "bento/ubuntu-20.04"
ALLOCATED_MEMORY = "512"

Vagrant.configure(2) do |config|
  
  config.vm.provider "virtualbox" do |vb|
    vb.memory = ALLOCATED_MEMORY
  end

  config.vm.box = VAGRANT_BOX

  # Install Docker
  config.vm.provision :docker

  # Install Docker Compose
  # First, install required plugin https://github.com/leighmcculloch/vagrant-docker-compose:
  # vagrant plugin install vagrant-docker-compose
  config.vm.provision :docker_compose

  config.vm.network :forwarded_port, guest: 8080, host: 8080

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update -y
    apt-get upgrade -y
    apt-get dist-upgrade -y
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    apt-get -y update && sudo apt-get -y install yarn
    cd /vagrant
    yarn add passport-google-oauth20 --no-bin-links
  SHELL
end
