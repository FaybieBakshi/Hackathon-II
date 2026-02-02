"""
Main entry point for the Console Todo Application.
"""
from src.cli.cli_interface import TodoCLI


def main():
    """Application entry point."""
    cli = TodoCLI()
    cli.run()


if __name__ == "__main__":
    main()