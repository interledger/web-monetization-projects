.class final Landroidx/appcompat/app/x$a;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/appcompat/view/menu/v$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/x;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x12
    name = "a"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/x$a;->a:Landroidx/appcompat/app/x;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroidx/appcompat/view/menu/l;Z)V
    .locals 0

    iget-object p2, p0, Landroidx/appcompat/app/x$a;->a:Landroidx/appcompat/app/x;

    invoke-virtual {p2, p1}, Landroidx/appcompat/app/x;->b(Landroidx/appcompat/view/menu/l;)V

    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/l;)Z
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/app/x$a;->a:Landroidx/appcompat/app/x;

    invoke-virtual {v0}, Landroidx/appcompat/app/x;->o()Landroid/view/Window$Callback;

    move-result-object v0

    if-eqz v0, :cond_0

    const/16 v1, 0x6c

    invoke-interface {v0, v1, p1}, Landroid/view/Window$Callback;->onMenuOpened(ILandroid/view/Menu;)Z

    :cond_0
    const/4 p1, 0x1

    return p1
.end method
