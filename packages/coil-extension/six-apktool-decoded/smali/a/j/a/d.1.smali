.class La/j/a/d;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/g;->Y()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/g;


# direct methods
.method constructor <init>(La/j/a/g;)V
    .locals 0

    iput-object p1, p0, La/j/a/d;->a:La/j/a/g;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 1

    iget-object v0, p0, La/j/a/d;->a:La/j/a/g;

    invoke-virtual {v0}, La/j/a/g;->c()V

    return-void
.end method
