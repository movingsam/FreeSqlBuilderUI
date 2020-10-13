function install-freesqlbuilder-ui {
    yarn
    yarn build
    Pop-Location
}


@( "install-freesqlbuilder-ui" ) | ForEach-Object {
    echo ""
    echo "***** $_ *****"
    echo ""

    # Invoke function and exit on error
    &$_
    if ($LastExitCode -ne 0) { Exit $LastExitCode }
}