.class Landroidx/appcompat/widget/h;
.super Landroidx/appcompat/widget/P;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/widget/g$d;-><init>(Landroidx/appcompat/widget/g;Landroid/content/Context;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic j:Landroidx/appcompat/widget/g;

.field final synthetic k:Landroidx/appcompat/widget/g$d;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/g$d;Landroid/view/View;Landroidx/appcompat/widget/g;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/h;->k:Landroidx/appcompat/widget/g$d;

    iput-object p3, p0, Landroidx/appcompat/widget/h;->j:Landroidx/appcompat/widget/g;

    invoke-direct {p0, p2}, Landroidx/appcompat/widget/P;-><init>(Landroid/view/View;)V

    return-void
.end method


# virtual methods
.method public a()Landroidx/appcompat/view/menu/z;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/h;->k:Landroidx/appcompat/widget/g$d;

    iget-object v0, v0, Landroidx/appcompat/widget/g$d;->d:Landroidx/appcompat/widget/g;

    iget-object v0, v0, Landroidx/appcompat/widget/g;->z:Landroidx/appcompat/widget/g$e;

    if-nez v0, :cond_0

    const/4 v0, 0x0

    return-object v0

    :cond_0
    invoke-virtual {v0}, Landroidx/appcompat/view/menu/u;->b()Landroidx/appcompat/view/menu/s;

    move-result-object v0

    return-object v0
.end method

.method public b()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/h;->k:Landroidx/appcompat/widget/g$d;

    iget-object v0, v0, Landroidx/appcompat/widget/g$d;->d:Landroidx/appcompat/widget/g;

    invoke-virtual {v0}, Landroidx/appcompat/widget/g;->i()Z

    const/4 v0, 0x1

    return v0
.end method

.method public c()Z
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/widget/h;->k:Landroidx/appcompat/widget/g$d;

    iget-object v0, v0, Landroidx/appcompat/widget/g$d;->d:Landroidx/appcompat/widget/g;

    iget-object v1, v0, Landroidx/appcompat/widget/g;->B:Landroidx/appcompat/widget/g$c;

    if-eqz v1, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    invoke-virtual {v0}, Landroidx/appcompat/widget/g;->e()Z

    const/4 v0, 0x1

    return v0
.end method
