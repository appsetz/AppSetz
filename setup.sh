#!/bin/bash

echo "========================================"
echo "Portfolio Website Setup"
echo "========================================"
echo ""

echo "Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
echo "Clean complete!"
echo ""

echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "Installation completed successfully!"
    echo "========================================"
    echo ""
    echo "To start the development server, run:"
    echo "npm run dev"
    echo ""
else
    echo ""
    echo "========================================"
    echo "Installation failed!"
    echo "========================================"
    echo "Please check the error messages above"
    echo ""
fi

