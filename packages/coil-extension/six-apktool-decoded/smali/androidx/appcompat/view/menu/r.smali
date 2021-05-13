.class Landroidx/appcompat/view/menu/r;
.super Landroidx/appcompat/view/menu/q;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/appcompat/view/menu/r$a;
    }
.end annotation


# direct methods
.method constructor <init>(Landroid/content/Context;La/g/c/a/b;)V
    .locals 0

    invoke-direct {p0, p1, p2}, Landroidx/appcompat/view/menu/q;-><init>(Landroid/content/Context;La/g/c/a/b;)V

    return-void
.end method


# virtual methods
.method a(Landroid/view/ActionProvider;)Landroidx/appcompat/view/menu/q$a;
    .locals 2

    new-instance v0, Landroidx/appcompat/view/menu/r$a;

    iget-object v1, p0, Landroidx/appcompat/view/menu/c;->b:Landroid/content/Context;

    invoke-direct {v0, p0, v1, p1}, Landroidx/appcompat/view/menu/r$a;-><init>(Landroidx/appcompat/view/menu/r;Landroid/content/Context;Landroid/view/ActionProvider;)V

    return-object v0
.end method
