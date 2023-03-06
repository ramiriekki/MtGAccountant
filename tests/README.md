# Robot Framework Environment Setup

Install Python 3

```
brew install pyenv
pyenv install 3.10.6
export PATH="$(pyenv root)/shims:${PATH}"
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
pyenv init
pyenv local 3.10.6
```

Robot Framework and Selenium Library
```
pip3 install robotframework
pip3 install robotframework-seleniumlibrary
```

## Running robot tests

On command line use `robot --outputdir ./Results Tests`


