desc "deploy site to eventos.participe.de"
task :deploy do
  require 'rubygems'
  require 'highline/import'
  require 'net/ssh'

  branch = "master"

  username = ask("Username:  ") { |q| q.echo = true }
  password = ask("Password:  ") { |q| q.echo = "*" }

  Net::SSH.start('eventos.participe.de', username, :password => password) do |ssh|
    commands = <<EOF
cd ~/cached-copy
echo 'getting latest from github'
git checkout #{branch}
git pull origin #{branch}
git checkout -f
echo 'make sure _site is gone!'
rm -rf _site
echo 'jekylling it!'
jekyll --no-auto
echo 'moving latest site to a temp place'
mv _site ../_#{branch}
echo 'moving current site to a temp place'
mv ../www _old
echo 'getting latest on production'
mv ../_#{branch} ../www
echo 'getting a rid of old one'
rm -rf _old
EOF
    commands = commands.gsub(/\n/, "; ")
    ssh.exec commands
  end
end
