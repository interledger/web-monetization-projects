.class Landroidx/appcompat/app/r;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/i/o;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/x;->u()Landroid/view/ViewGroup;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/r;->a:Landroidx/appcompat/app/x;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;La/g/i/C;)La/g/i/C;
    .locals 4

    invoke-virtual {p2}, La/g/i/C;->d()I

    move-result v0

    iget-object v1, p0, Landroidx/appcompat/app/r;->a:Landroidx/appcompat/app/x;

    invoke-virtual {v1, v0}, Landroidx/appcompat/app/x;->i(I)I

    move-result v1

    if-eq v0, v1, :cond_0

    invoke-virtual {p2}, La/g/i/C;->b()I

    move-result v0

    invoke-virtual {p2}, La/g/i/C;->c()I

    move-result v2

    invoke-virtual {p2}, La/g/i/C;->a()I

    move-result v3

    invoke-virtual {p2, v0, v1, v2, v3}, La/g/i/C;->a(IIII)La/g/i/C;

    move-result-object p2

    :cond_0
    invoke-static {p1, p2}, La/g/i/s;->a(Landroid/view/View;La/g/i/C;)La/g/i/C;

    move-result-object p1

    return-object p1
.end method
